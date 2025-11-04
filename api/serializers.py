from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Veiculo, Manutencao, Usuario, Viagem_realizada, Manutencao_realizada

class VeiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veiculo
        fields = ['placa', 'modelo', 'quilometragem', 'marca']

class VeiculoDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veiculo
        fields = ['placa']

class ManutencaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manutencao
        fields = ['id_manutencao', 'tipo', 'custo', 'dia_hora']

class ManutencaoDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manutencao
        fields = ['id_manutencao']

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id_usuario', 'nome', 'cpf', 'senha', 'tipo']

    def create(self, validated_data):
        validated_data['senha'] = make_password(validated_data['senha'])
        return super().create(validated_data)
    
class UsuarioDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id_usuario']
    
class ViagemRealizadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Viagem_realizada
        fields = ['data_hora', 'origem', 'destino', 'placa', 'id_usuario']

class ManutencaoRealizadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manutencao_realizada
        fields = ['placa', 'id_manutencao']

