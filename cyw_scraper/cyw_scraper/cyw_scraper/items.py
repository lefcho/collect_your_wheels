# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class CarItem(scrapy.Item):
    series_title = scrapy.Field()
    toy_number = scrapy.Field()
    model = scrapy.Field()
    series_number = scrapy.Field()
    is_super_treasure_hunt = scrapy.Field()
    is_treasure_hunt = scrapy.Field()
    image_url = scrapy.Field()
    year = scrapy.Field()
