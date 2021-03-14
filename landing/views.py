from django.shortcuts import render
from .models import User
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from kenex_django.settings import EMAIL_HOST_USER

# Create your views here.

def main_page(request):
    if request.method == 'GET':
        return render(request, 'landing/index.html')

    if request.method == 'POST':
        name = request.POST.get('name')
        if name[-1]==" ":
            name = name[:-1]
        surname = request.POST.get('surname')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        message = request.POST.get('message')

        newUser = User.objects.create(
            name=name,
            surname=surname,
            email=email,
            phone=phone,
            message=message
        )

        newUser.save()

        emailMessage = EmailMultiAlternatives(
            'Potvrzení zprávy',
            f'',
            EMAIL_HOST_USER,
            [email]
        )
        emailMessage.attach_alternative(
        f'Dobrý den, {name}. Náš obchod obdržel Vaši zprávu a kontaktujeme Vás do 3 dnů. Přejeme hezký den, firma Kenex s.r.o. <br><br> <a href="https://www.kenex.cz/">Kenex.cz</a>',
        "text/html")
        emailMessage.send()
        return render(request, 'landing/index.html')
