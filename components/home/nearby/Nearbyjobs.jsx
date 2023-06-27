import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style';

import { COLORS, SIZES } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { useFetch } from '../../../hooks/useFetch';

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, loading, error } = useFetch('search', {
    query: 'React Developer',
    num_pages: 1,
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((item) => {
            return (
              <NearbyJobCard
                key={`nearby-job-${item?.job_id} 
                `}
                job={item}
                handleNavigate={() => {
                  router.push(`/job-details/${item?.job_id}`);
                }}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
