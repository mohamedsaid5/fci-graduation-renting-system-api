from modeltranslation.translator import register, TranslationOptions
from .models import Apartment

@register(Apartment)
class ApartmentTranslationOptions(TranslationOptions):
    fields = ('title', 'description',)
