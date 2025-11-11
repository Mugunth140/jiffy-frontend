import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { TaskManager } from '../services/TaskManager';

type TaskDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskDetail'>;
type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;

interface TaskDetailScreenProps {
  navigation: TaskDetailScreenNavigationProp;
  route: TaskDetailScreenRouteProp;
}

export const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({ navigation, route }) => {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    try {
      await TaskManager.updateTask(task.id, {
        title,
        description,
        priority,
      });
      setIsEditing(false);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'Failed to update task');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await TaskManager.deleteTask(task.id);
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting task:', error);
              Alert.alert('Error', 'Failed to delete task');
            }
          },
        },
      ]
    );
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Title</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
          ) : (
            <Text style={styles.value}>{title}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          ) : (
            <Text style={styles.value}>
              {description || 'No description'}
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Priority</Text>
          {isEditing ? (
            <View style={styles.priorityContainer}>
              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  priority === 'low' && styles.priorityButtonLow,
                ]}
                onPress={() => setPriority('low')}
              >
                <Text
                  style={[
                    styles.priorityText,
                    priority === 'low' && styles.priorityTextActive,
                  ]}
                >
                  Low
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  priority === 'medium' && styles.priorityButtonMedium,
                ]}
                onPress={() => setPriority('medium')}
              >
                <Text
                  style={[
                    styles.priorityText,
                    priority === 'medium' && styles.priorityTextActive,
                  ]}
                >
                  Medium
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  priority === 'high' && styles.priorityButtonHigh,
                ]}
                onPress={() => setPriority('high')}
              >
                <Text
                  style={[
                    styles.priorityText,
                    priority === 'high' && styles.priorityTextActive,
                  ]}
                >
                  High
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={[styles.value, styles.priorityValue]}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>
            {task.completed ? 'Completed ✓' : 'Active'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Created</Text>
          <Text style={styles.value}>{formatDate(task.createdAt)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Last Updated</Text>
          <Text style={styles.value}>{formatDate(task.updatedAt)}</Text>
        </View>

        {!isEditing && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Task</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  backButton: {
    fontSize: 16,
    color: '#6b7280',
  },
  editButton: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
  saveButton: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    color: '#1f2937',
  },
  priorityValue: {
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    minHeight: 100,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  priorityButtonLow: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  priorityButtonMedium: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  priorityButtonHigh: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  priorityTextActive: {
    color: 'white',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
