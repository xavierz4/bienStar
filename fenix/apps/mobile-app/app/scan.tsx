import { useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { View, Text, YStack, XStack, Button } from 'tamagui';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { getCurrentLocation } from '../src/lib/location';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View f={1} />;
  }

  if (!permission.granted) {
    return (
      <View f={1} jc="center" ai="center" bc="$background" p="$8">
        <Text ta="center" color="$color.secondary" mb="$4" fontWeight="bold" fontSize="$6">
          Necesitamos acceso a la cámara
        </Text>
        <Button onPress={requestPermission} bc="$color.primary" px="$6" py="$3" br="$6">
          <Text color="white" fontWeight="bold">Conceder Permiso</Text>
        </Button>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setPhoto(photo.uri);
        }
      } catch (e) {
        console.error("Error tomar foto", e);
      }
    }
  };

  const saveEvidence = async () => {
    if (!photo) return;
    
    setSaving(true);
    try {
      // Move photo to permanent storage
      const filename = `evidence_${Date.now()}.jpg`;
      const permanentPath = `${FileSystem.documentDirectory}${filename}`;
      
      await FileSystem.copyAsync({
        from: photo,  // Temporal: file:///tmp/...
        to: permanentPath  // Permanente: file:///Documents/...
      });

      // Get GPS coordinates
      const { lat, lng } = await getCurrentLocation();

      // Save to database
      const { database } = require('../src/lib/database');
      await database.write(async () => {
        await database.get('deliveries').create(delivery => {
          delivery.beneficiaryId = 'dummy-beneficiary-id'; // TODO: Get from route params
          delivery.campaignMonth = 'JULIO-2025'; // TODO: Dynamic
          delivery.status = 'pending';
          delivery.evidencePhotoPath = permanentPath;
          delivery.gpsLat = lat;
          delivery.gpsLng = lng;
          delivery.deliveryDate = new Date();
        });
      });

      router.back();
    } catch (error) {
      console.error("Error saving evidence:", error);
      alert('No se pudo guardar la evidencia');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View f={1} bc="$black">
      {photo ? (
        <View f={1}>
          <Image source={{ uri: photo }} style={{ flex: 1 }} resizeMode="contain" />
          <XStack pos="absolute" b="$10" l="$0" r="$0" jc="space-around" px="$8">
            <Button onPress={() => setPhoto(null)} bc="rgba(255,255,255,0.2)" px="$8" py="$4" br="$6" disabled={saving}>
              <Text color="white" fontWeight="bold">Repetir</Text>
            </Button>
            <Button onPress={saveEvidence} bc="$green9" px="$8" py="$4" br="$6" disabled={saving}>
              <Text color="white" fontWeight="bold">{saving ? 'Guardando...' : 'Guardar'}</Text>
            </Button>
          </XStack>
        </View>
      ) : (
        <CameraView style={{ flex: 1 }} facing="back" ref={cameraRef}>
          <View f={1} jc="flex-end" pb="$20" ai="center">
            <Button onPress={takePicture} w={80} h={80} circular bordered borderWidth={4} borderColor="white" ai="center" jc="center" bc="rgba(255,255,255,0.3)">
              <View w={64} h={64} circular bc="white" />
            </Button>
          </View>
        </CameraView>
      )}
      
      <Button 
        pos="absolute"
        t="$12"
        l="$6"
        bc="rgba(0,0,0,0.5)"
        p="$2"
        circular
        w={40}
        h={40}
        ai="center"
        jc="center"
        onPress={() => router.back()}
      >
        <Text color="white" fontWeight="bold">✕</Text>
      </Button>
    </View>
  );
}
