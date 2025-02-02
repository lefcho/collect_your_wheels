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
            # Convert relative URL to absolute URL
            full_url = response.urljoin(path)
            yield {
                'title': response.css("h1::text").get(),
                'url': full_url,
            }
