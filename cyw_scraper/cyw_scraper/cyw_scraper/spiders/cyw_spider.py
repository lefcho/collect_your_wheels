import scrapy
from cyw_scraper.items import CarItem


class WheelsSpider(scrapy.Spider):
    year = '2012'
    allowed_domains = ["hotwheels.fandom.com"]
    name = "cyw-scraper"
    start_urls = [
        f"https://hotwheels.fandom.com/wiki/List_of_{year}_Hot_Wheels"
    ]

    def parse(self, response):
        tables_bodies = response.css("table.wikitable tbody")
        color_number = 1
        previous_model = ''

        for table in tables_bodies:
            rows = table.css("tr")
            series_number = 0
            all_car_models = set(table.css("td:nth-child(3) a::text").getall())

            for row in rows:
                toy_number = row.css("td:nth-child(1)::text").get()
                model = row.css("td:nth-child(3) a::text").get()
                series_title = row.css("td:nth-child(4)::text").get()
                if series_title is None:
                    series_title = row.css("td:nth-child(4) font::text").get()
                image_url = row.css("td:nth-child(5) a img::attr(src)").get()
                is_super_treasure_hunt = (row.css("td:nth-child(4) b a font::text").get() == "Super Treasure Hunt")
                is_treasure_hunt = (row.css("td:nth-child(4) b a font::text").get() == "Treasure Hunt")

                if not toy_number or not model:
                    continue

                current_model = model
                if current_model == previous_model:
                    color_number += 1
                    current_model = f"{current_model} / Color: {color_number}"
                else:
                    series_number += 1
                    color_number = 1
                previous_model = model

                if image_url and image_url.startswith("data:"):
                    image_url = None

                car_item = CarItem()

                car_item["series_title"] = series_title.strip()
                car_item["toy_number"] = toy_number.strip()
                car_item["series_number"] = series_number
                car_item["max_car_number"] = len(all_car_models)
                car_item["model"] = current_model.strip()
                car_item["is_treasure_hunt"] = is_treasure_hunt
                car_item["is_super_treasure_hunt"] = is_super_treasure_hunt
                car_item["image_url"] = image_url
                car_item["year"] = int(self.year)

                yield car_item
