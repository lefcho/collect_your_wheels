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
        series_title = response.css("h1::text").get()  # series page title

        # Select all rows in the wikitable, skipping the header row
        rows = response.css("table.wikitable tr")[1:]
        for row in rows:
            toy_number = row.css("td:nth-child(1)::text").get()
            model = row.css("td:nth-child(2)::text").get()
            series_number = row.css("td:nth-child(3)::text").get()
            image_url = row.css("td:nth-child(4) img::attr(src)").get()

            yield {
                "series_title": series_title,
                "toy_number": toy_number.strip() if toy_number else None,
                "model": model.strip() if model else None,
                "series_number": series_number.strip() if series_number else None,
                "image_url": image_url,
            }
