from django.shortcuts import render
from rest_framework import viewsets
from .models import Veiculo, Manutencao, Usuario, Viagem_realizada, Manutencao_realizada
from .serializers import VeiculoSerializer, ManutencaoSerializer, UsuarioSerializer, ViagemRealizadaSerializer, ManutencaoRealizadaSerializer

class VeiculoViewSet(viewsets.ModelViewSet):
    queryset = Veiculo.objects.all()
    serializer_class = VeiculoSerializer

class ManutencaoViewSet(viewsets.ModelViewSet):
    queryset = Manutencao.objects.all()
    serializer_class = ManutencaoSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class ViagemRealizadaViewSet(viewsets.ModelViewSet):
    queryset = Viagem_realizada.objects.all()
    serializer_class = ViagemRealizadaSerializer

class ManutencaoRealizadaViewSet(viewsets.ModelViewSet):
    queryset = Manutencao_realizada.objects.all()
    serializer_class = ManutencaoRealizadaSerializer


# Create your views here.
