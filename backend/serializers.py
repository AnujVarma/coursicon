from backend.models import *
from rest_framework import serializers

class UserMetadataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CoursiconUser
        fields = ('url', 'username', 'email', 'groups')
