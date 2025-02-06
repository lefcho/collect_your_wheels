# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from django.db import IntegrityError
from series.models import Series
from cars.models import Car


class HotWheelsPipeline:
    def process_item(self, item, spider):
        # Get or create the Series object
        series_title = item.get("series_title")
        if series_title:
            series_obj, created = Series.objects.get_or_create(
                title=series_title,
                year=item.get("year")
            )
        else:
            spider.logger.warning("No series title found")
            return item

        try:
            car_obj = Car(
                toy_number=item.get("toy_number"),
                model=item.get("model"),
                series=series_obj,
                series_number=item.get("series_number"),
                is_super_treasure_hunt=item.get("is_super_treasure_hunt"),
                is_treasure_hunt=item.get("is_treasure_hunt"),
                image_url=item.get("image_url"),
            )
            car_obj.save()
            spider.logger.info(f"Saved car: {car_obj}")
        except IntegrityError as e:
            spider.logger.error(f"Error saving car: {e}")
        return item
