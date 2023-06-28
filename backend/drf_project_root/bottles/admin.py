from django.contrib import admin

from bottles.models import User, Supplier, Collector, Order, TypeOfGoods,  Address, RecyclePoint

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass

admin.site.register(Supplier)
admin.site.register(Collector)
admin.site.register(Order)
admin.site.register(TypeOfGoods)

admin.site.register(Address)
admin.site.register(RecyclePoint)

