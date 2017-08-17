from backend.models import *
from rest_framework import serializers

class UserMetadataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CoursiconUser
        fields = ('url', 'id', 'username', 'email', 'groups')

class OrReqField(serializers.RelatedField):
    def to_representation(self, value):
        return map(lambda c: c.id, value.reqCourses.all())

class CourseSerializer(serializers.ModelSerializer):
    orReqs = OrReqField(many=True, read_only=True)
    reqCourses = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ('id', 'name', 'courseNumber', 'description', 'orReqs', 'reqCourses')

class MajorCourseMapSerializer(serializers.HyperlinkedModelSerializer):
    college = serializers.StringRelatedField()
    courses = CourseSerializer(many=True, read_only=True)

    class Meta:
        model = Major
        fields = ('url', 'id', 'name', 'college', 'courses')
