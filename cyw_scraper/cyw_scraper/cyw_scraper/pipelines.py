# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class HotWheelsPipeline:
    def process_item(self, item, spider):
        toy_number = item["toy_number"]
        item["toy_number"] = toy_number.strip()
        return item
