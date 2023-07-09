from django.contrib import admin
from bottles.models import User, Rating, Order
from bottles.models import TypeOfGoods, RecyclePoint


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass


admin.site.register(Rating)
admin.site.register(Order)
admin.site.register(TypeOfGoods)
admin.site.register(RecyclePoint)
