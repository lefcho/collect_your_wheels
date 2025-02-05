import scrapy


class WheelsSpider(scrapy.Spider):
    year = '2012'

    name = "cyw-scraper"
    start_urls = [
        f"https://hotwheels.fandom.com/wiki/List_of_{year}_Hot_Wheels"
    ]

    def parse(self, response):
        # Collect all links under <span class="mw-headline"> then <b> then <a>
        link_paths = response.css("span.mw-headline b a::attr(href)").getall()
        for path in link_paths:
            full_url = response.urljoin(path)
            yield scrapy.Request(full_url, callback=self.parse_series_details)

    def parse_series_details(self, response):
        series_title = response.css("#firstHeading span::text").get()
        rows = response.css("table.wikitable tbody tr")
        color_number = 1
        previous_model = ''

        for row in rows:
            toy_number = row.css("td:nth-child(1)::text").get()
            model = row.css("td:nth-child(3) a::text").get()
            series_number = row.css("td:nth-child(5)::text").get()
            image_url = row.css("td:nth-child(6) a img::attr(src)").get()

            if not toy_number or not model:
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

            yield {
                "series_title": series_title,
                "toy_number": toy_number.strip(),
                "model": current_model.strip(),
                "series_number": series_number.split("/")[0],
                "is_super_treasure_hunt": False,
                "image_url": image_url,
            }
