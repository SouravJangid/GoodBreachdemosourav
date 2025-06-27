import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const GoalCard = ({ goal }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: goal.goalImage }} style={styles.image} />
      <Text style={styles.title}>{goal.goalName}</Text>
      <Text>Amount: £{goal.goalAmount}</Text>
      <Text>Target: {new Date(goal.durationDate).toDateString()}</Text>
      {goal.reward?.imageUrl && (
        <Image
          source={{ uri: goal.reward.imageUrl }}
          style={styles.rewardImage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  image: {
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  rewardImage: {
    height: 60,
    width: 60,
    borderRadius: 8,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GoalCard;
