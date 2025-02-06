import scrapy
from cyw_scraper.items import CarItem


FORBIDDEN_LINKS = {
    '2012': ['https://hotwheels.fandom.com/wiki/Thrill_Racers_Series',
             'https://hotwheels.fandom.com/wiki/Chinese_New_Year'],
}


class WheelsSpider(scrapy.Spider):
    year = '2012'

    name = "cyw-scraper"
    start_urls = [
        f"https://hotwheels.fandom.com/wiki/List_of_{year}_Hot_Wheels"
    ]

    def parse(self, response):
        # Collect all links under <span class="mw-headline"> then <b> then <a>
        link_paths = response.css("span.mw-headline b a::attr(href)").getall()
        link_paths += response.css("span.mw-headline a::attr(href)").getall()
        for path in link_paths:
            if path not in FORBIDDEN_LINKS[self.year]:
                full_url = response.urljoin(path)
                yield scrapy.Request(full_url, callback=self.parse_series_details)

    def parse_series_details(self, response):
        series_title = response.css("#firstHeading span::text").get()
        rows = response.css("table.wikitable tbody tr")
        color_number = 1
        previous_model = ''

        for row in rows:
            if "Treasure Hunts Series" not in series_title:
                toy_number = row.css("td:nth-child(1)::text").get()
                model = row.css("td:nth-child(3) a::text").get()
                series_number = row.css("td:nth-child(5)::text").get()
                image_url = row.css("td:nth-child(6) a img::attr(src)").get()
                is_super_treasure_hunt = (row.css("td:nth-child(4) b a::text").get() == "Super Treasure Hunt")
                is_treasure_hunt = False
            else:
                toy_number = row.css("td:nth-child(1)::text").get()
                model = row.css("td:nth-child(4) a::text").get()
                series_number = row.css("td:nth-child(3)::text").get()
                image_url = row.css("td:nth-child(12) a img::attr(src)").get()
                is_super_treasure_hunt = False
                is_treasure_hunt = True

            if not toy_number or not model or not series_number:
                continue

            current_model = model
            if current_model == previous_model:
                color_number += 1
                current_model = f"{current_model} / Color: {color_number}"
            else:
                color_number = 1
            previous_model = model

            if image_url and image_url.startswith("data:"):
                image_url = None

            car_item = CarItem()

            car_item["series_title"] = series_title.strip()
            car_item["toy_number"] = toy_number.strip()
            car_item["series_number"] = series_number.split("/")[0].strip()
            car_item["max_car_number"] = series_number.split("/")[1].strip()
            car_item["model"] = current_model.strip()
            car_item["is_treasure_hunt"] = is_treasure_hunt
            car_item["is_super_treasure_hunt"] = is_super_treasure_hunt
            car_item["image_url"] = image_url
            car_item["year"] = int(self.year)

            yield car_item
