from django.db import models

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=50)
    cpf = models.CharField(max_length=11, unique=True)
    senha = models.CharField(max_length=512)
    tipo = models.CharField(max_length=20)

    class Meta:
        db_table = 'usuario'

class Manutencao(models.Model):
    id_manutencao = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=50)
    custo = models.DecimalField(max_digits=8, decimal_places=2)
    dia_hora = models.DateTimeField()
    
    class Meta:
        db_table = 'manutencao'

class Veiculo(models.Model):
    placa = models.CharField(max_length=7, unique=True)
    modelo = models.CharField(max_length=15)
    quilometragem = models.DecimalField(max_digits=15, decimal_places=2)
    marca = models.CharField(max_length=20)


    class Meta:
        db_table = 'veiculo'

class Viagem_realizada(models.Model):
    data_hora = models.DateTimeField()
    origem = models.CharField(max_length=50)
    destino = models.CharField(max_length=50)
    placa = models.CharField(max_length=7)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)


    class Meta:
        db_table = 'viagem_realizada'

class Manutencao_realizada(models.Model):
    placa = models.ForeignKey(Veiculo, on_delete=models.CASCADE)
    id_manutencao = models.ForeignKey(Manutencao, on_delete=models.CASCADE)
    

    class Meta:
        db_table = 'manutencao_realizada'
# Create your models here.
