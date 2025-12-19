import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Svg, Circle } from 'react-native-svg';
import { Scan, Search, ChevronRight, Clock, CheckCircle } from 'lucide-react-native';
import { View, Text, ScrollView, YStack, XStack, Button, Card, H1, Paragraph, Circle as TamaguiCircle } from 'tamagui';
import { useBeneficiaries } from '../src/hooks/useBeneficiaries';
import { useDeliveryStats } from '../src/hooks/useDeliveryStats';

const { width } = Dimensions.get('window');

const CircularProgress = ({ value, total }: { value: number, total: number }) => {
  const radius = 90;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  const progress = value / total;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <YStack ai="center" jc="center" py="$6">
      <Svg width={220} height={220} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#0F172A" // Secondary/Dark
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeOpacity={0.1}
        />
        <Circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#0EA5E9" // Primary/Blue
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <YStack pos="absolute" ai="center">
        <Text fontSize={60} fontWeight="bold" color="$color.secondary">{value}</Text>
        <Text fontSize={36} fontWeight="bold" color="$color.secondary" mb="$1">{total}</Text>
        <Text fontSize="$4" color="$color.subtext" fontWeight="500">Entregas</Text>
      </YStack>
    </YStack>
  );
};

const BeneficiaryCard = ({ name, type, status, typeColor, typeBg }: any) => (
  <Card p="$5" mb="$4" bc="$background" br="$6" bordered animation="bouncy" scale={0.9} hoverStyle={{ scale: 0.925 }} pressStyle={{ scale: 0.875 }}>
    <XStack ai="center" jc="space-between">
      <YStack>
        <Text fontSize="$5" fontWeight="bold" color="$color.secondary" mb="$1">{name}</Text>
        <View px="$3" py="$1" br="$10" bc={typeBg} als="flex-start">
          <Text fontSize="$2" fontWeight="bold" color={typeColor}>{type}</Text>
        </View>
      </YStack>
      <XStack ai="center" gap="$2">
        {status === 'Pendiente' ? (
          <>
            <Text color="$color.subtext" fontWeight="500">Pendiente</Text>
            <Clock size={20} color="#94A3B8" />
          </>
        ) : (
          <>
            <Text color="$color.success" fontWeight="bold">Entregado</Text>
            <CheckCircle size={20} color="#10B981" />
          </>
        )}
        <ChevronRight size={20} color="#CBD5E1" />
      </XStack>
    </XStack>
  </Card>
);

export default function HomeScreen() {
  const { beneficiaries, loading } = useBeneficiaries();
  const { completed, total } = useDeliveryStats();

  return (
    <View f={1} bc="$background">
      <StatusBar style="dark" />
      
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
        {/* Header */}
        <XStack pt="$8" mb="$6" jc="space-between" ai="flex-start">
          <YStack>
            <H1 fontSize={36} fontWeight="bold" color="$color.secondary" letterSpacing={-1}>Hola, Yurledis</H1>
            <XStack ai="center" mt="$1">
              <Paragraph color="$color.subtext" fontSize="$4">📍 Manaure, Zona 3</Paragraph>
            </XStack>
          </YStack>
          <XStack bc="$orange3" px="$3" py="$1.5" br="$4" ai="center" gap="$2" bw={1} boc="$orange5">
            <TamaguiCircle size={8} bc="$orange9" />
            <Text color="$orange9" fontSize="$2" fontWeight="bold">Offline Mode</Text>
          </XStack>
        </XStack>

        {/* Progress Circle */}
        <CircularProgress value={completed} total={total} />

        {/* List Header */}
        <XStack jc="space-between" ai="flex-end" mb="$4" mt="$6">
          <Text fontSize="$5" fontWeight="bold" color="$color.secondary">Próximos Beneficiarios</Text>
          <Button chromeless p={0}>
            <Text color="$color.primary" fontWeight="bold">Ver todo</Text>
          </Button>
        </XStack>

        {/* Beneficiaries List */}
        {loading ? (
          <Text>Cargando beneficiarios...</Text>
        ) : beneficiaries.length === 0 ? (
          <Text>No hay beneficiarios registrados</Text>
        ) : (
          beneficiaries.map(b => (
            <BeneficiaryCard 
              key={b.id}
              name={b.fullName}
              type={b.groupType}
              status="Pendiente"
              typeBg="$purple3"
              typeColor="$purple9"
            />
          ))
        )}

      </ScrollView>

      {/* Floating Action Button */}
      <View pos="absolute" b="$6" l="$6" r="$6">
        <Link href="/scan" asChild>
          <Button h="$6" br="$6" bc="$color.primary" icon={<Scan color="white" size={24} />} iconAfter={<Search color="white" size={24} opacity={0.5} />}>
            <Text color="white" fontWeight="bold" fontSize="$5">Escanear / Buscar</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}
