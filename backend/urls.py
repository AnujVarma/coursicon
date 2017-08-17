from django.conf.urls import url, include
from rest_framework import routers
from backend.views import UserMetadataViewSet, MajorCourseMapViewSet

router = routers.DefaultRouter()
router.register(r'users', UserMetadataViewSet)
router.register(r'majors', MajorCourseMapViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
