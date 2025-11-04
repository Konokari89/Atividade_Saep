from rest_framework import routers
from .views import VeiculoViewSet, ManutencaoViewSet, UsuarioViewSet, ViagemRealizadaViewSet, ManutencaoRealizadaViewSet

router = routers.DefaultRouter()
router.register(r'veiculos', VeiculoViewSet)
router.register(r'manutencoes', ManutencaoViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'viagens_realizadas', ViagemRealizadaViewSet)
router.register(r'manutencoes_realizadas', ManutencaoRealizadaViewSet)
urlpatterns = router.urls