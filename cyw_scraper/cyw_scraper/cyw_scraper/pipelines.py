# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
from asgiref.sync import sync_to_async
from itemadapter import ItemAdapter
from twisted.internet.threads import deferToThread
from django.db import IntegrityError
from cyw_backend.series.models import Series
from cyw_backend.cars.models import Car


class HotWheelsPipeline:
    async def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        series_title = adapter.get("series_title")
        if series_title:
            series_obj, created = await sync_to_async(Series.objects.get_or_create)(
                title=series_title,
                year=adapter.get("year"),
                number_of_cars=adapter.get("max_car_number"),
            )
        else:
            spider.logger.warning("No series title found")
            return item

        try:
            # Create and save the Car object synchronously via sync_to_async
            def create_car():
                car = Car(
                    toy_number=adapter.get("toy_number"),
                    model=adapter.get("model"),
                    series=series_obj,
                    series_number=adapter.get("series_number"),
                    is_super_treasure_hunt=adapter.get("is_super_treasure_hunt"),
                    is_treasure_hunt=adapter.get("is_treasure_hunt"),
                    image_url=adapter.get("image_url"),
                )
                car.save()
                return car

            car_obj = await sync_to_async(create_car)()
            spider.logger.info(f"Saved car: {car_obj}")
        except IntegrityError as e:
            spider.logger.error(f"Error saving car: {e}")
        return item
