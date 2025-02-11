from rest_framework import serializers


class ReadOnlyModelSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        raise serializers.ValidationError("This serializer is read-only.")

    def update(self, instance, validated_data):
        raise serializers.ValidationError("This serializer is read-only.")
