import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { apiCall } from '../../config/api';
import { getFromStorage } from "../../utils/Storage";

const { width } = Dimensions.get("window");

const CreateGoalScreen = ({ navigation }) => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [durationDate, setDurationDate] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);

  const goalTypes = [
    { type: 'trip', emoji: '🧳', label: 'Trip', image: 'trip.jpg' },
    { type: 'laptop', emoji: '💻', label: 'Laptop', image: 'laptop.jpg' },
    { type: 'college fee', emoji: '🎓', label: 'College Fee', image: 'college-fee.jpg' },
    { type: 'game', emoji: '🎮', label: 'Game', image: 'game.jpg' },
    { type: 'future savings', emoji: '💰', label: 'Future Savings', image: 'future.jpg' },
    { type: 'emergency funds', emoji: '🛡', label: 'Emergency Funds', image: 'emergency.jpg' },
    { type: 'electronics', emoji: '📱', label: 'Electronics', image: 'electronics.jpg' },
    { type: 'accessories', emoji: '👜', label: 'Accessories', image: 'accessories.jpg' },
  ];

  const handleCreateGoal = async () => {
    setLoading(true);

    try {
      const user = await getFromStorage("user");

      if (!user || !user.token || !user._id) {
        setLoading(false);
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      if (!goalName || !goalAmount || !durationDate || !selectedType) {
        setLoading(false);
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      const selectedGoal = goalTypes.find(g => g.type === selectedType);

      const goalData = {
        userId: user._id,
        goalImage: selectedGoal?.image || 'default.jpg',
        goalName,
        goalAmount: parseFloat(goalAmount),
        durationDate,
        reward: {
          name: 'Laptop Bag',
          description: 'Get a stylish laptop bag on goal completion.',
          imageUrl: 'laptop-bag.jpg'
        }
      };

      console.log('📊 Creating goal with data:', goalData);

      const response = await apiCall('/create/goal', 'POST', goalData, user.token);

      console.log('📊 Goal creation response:', response);

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Goal created successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        console.log('❌ Goal creation failed:', response);
        Alert.alert('Error', 'Failed to create goal');
      }
    } catch (error) {
      console.log('❌ Error in creating goal:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New Goal</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Goal Name"
          value={goalName}
          onChangeText={setGoalName}
        />
        <TextInput
          style={styles.input}
          placeholder="Goal Amount (£)"
          value={goalAmount}
          onChangeText={setGoalAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Target Date (YYYY-MM-DD)"
          value={durationDate}
          onChangeText={setDurationDate}
        />
      </View>

      <Text style={styles.sectionTitle}>Goal Type</Text>
      <View style={styles.goalTypeContainer}>
        {goalTypes.map((goal) => (
          <TouchableOpacity
            key={goal.type}
            style={[
              styles.goalTypeButton,
              selectedType === goal.type && styles.goalTypeSelected
            ]}
            onPress={() => setSelectedType(goal.type)}
          >
            <Text style={styles.goalTypeEmoji}>{goal.emoji}</Text>
            <Text style={styles.goalTypeLabel}>{goal.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.logBtn, loading && styles.buttonDisabled]}
        onPress={handleCreateGoal}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Create Goal</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateGoalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#1C1825",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#FFEAE9",
    borderRadius: 10,
    width: width * 0.8,
    padding: 12,
    marginTop: 15,
  },
  sectionTitle: {
    color: "#121417",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins",
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "flex-start",
    marginLeft: 50,
  },
  logBtn: {
    backgroundColor: "#F0C0BE",
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    width: width * 0.8,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
  goalTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 7,
    marginVertical: 10,
  },
  goalTypeButton: {
    backgroundColor: '#FFF0EC',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    width: 100,
    height: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  goalTypeSelected: {
    backgroundColor: '#F0C0BE',
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  goalTypeEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  goalTypeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1825',
    textAlign: 'center',
  },
});
