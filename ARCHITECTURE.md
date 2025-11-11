# Jiffy Architecture Document

## Overview

Jiffy is a local-first productivity application built with React Native and Expo. It provides a seamless task management experience with offline-first capabilities.

## Architecture Principles

### Local-First Architecture

The app follows a local-first architecture pattern where:
1. All data is stored locally on the device
2. No network connection is required for the app to function
3. Data changes are immediately persisted to local storage
4. The architecture is designed to easily add cloud sync in the future

### Technology Stack

- **React Native**: Cross-platform mobile framework
- **Expo SDK 54**: Development framework and tooling
- **TypeScript**: Type-safe development
- **React Navigation**: Screen navigation
- **AsyncStorage**: Local data persistence
- **UUID**: Unique identifier generation

## Project Structure

```
jiffy-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── TaskItem.tsx     # Individual task display component
│   ├── navigation/          # Navigation setup
│   │   ├── AppNavigator.tsx # Main navigation container
│   │   └── types.ts         # Navigation type definitions
│   ├── screens/             # Screen components
│   │   ├── HomeScreen.tsx   # Main task list view
│   │   ├── AddTaskScreen.tsx    # Task creation screen
│   │   └── TaskDetailScreen.tsx # Task details and editing
│   ├── services/            # Business logic layer
│   │   ├── StorageService.ts    # Local storage operations
│   │   └── TaskManager.ts       # Task management logic
│   └── types/               # TypeScript definitions
│       └── index.ts         # Core type definitions
├── assets/                  # Static assets (images, icons)
├── App.tsx                  # Root component
├── index.ts                 # Entry point
└── app.json                 # Expo configuration

```

## Component Architecture

### Data Layer (Services)

#### StorageService
- **Purpose**: Abstracts AsyncStorage operations
- **Responsibilities**:
  - Save/load tasks to/from local storage
  - Add, update, and delete individual tasks
  - Clear all stored data
- **Key Methods**:
  - `saveTasks(tasks: Task[]): Promise<void>`
  - `loadTasks(): Promise<Task[]>`
  - `addTask(task: Task): Promise<void>`
  - `updateTask(taskId: string, updates: Partial<Task>): Promise<void>`
  - `deleteTask(taskId: string): Promise<void>`

#### TaskManager
- **Purpose**: Business logic for task management
- **Responsibilities**:
  - Create new tasks with default values
  - Retrieve tasks with filtering
  - Toggle task completion status
  - Update and delete tasks
- **Key Methods**:
  - `createTask(...): Promise<Task>`
  - `getAllTasks(): Promise<Task[]>`
  - `getTasksByFilter(filter): Promise<Task[]>`
  - `toggleTaskCompletion(taskId: string): Promise<void>`

### Presentation Layer (Screens)

#### HomeScreen
- **Purpose**: Main view showing all tasks
- **Features**:
  - Task list with filtering (All/Active/Completed)
  - Task statistics dashboard
  - Pull-to-refresh functionality
  - Floating action button for new tasks
- **State Management**:
  - Local state for tasks and filters
  - Reload on screen focus

#### AddTaskScreen
- **Purpose**: Create new tasks
- **Features**:
  - Task title input (required)
  - Description input (optional)
  - Priority selection (low/medium/high)
  - Form validation
- **Navigation**: Modal-style presentation

#### TaskDetailScreen
- **Purpose**: View and edit task details
- **Features**:
  - View mode showing all task information
  - Edit mode for updating task details
  - Delete functionality with confirmation
  - Timestamp display (created/updated)

### UI Components

#### TaskItem
- **Purpose**: Reusable task list item component
- **Features**:
  - Checkbox for completion toggle
  - Priority indicator (colored bar)
  - Task title and description preview
  - Tap to view details

## Data Model

### Task Interface
```typescript
interface Task {
  id: string;              // Unique identifier (UUID)
  title: string;           // Task title (required)
  description: string;     // Task description
  completed: boolean;      // Completion status
  createdAt: number;       // Creation timestamp
  updatedAt: number;       // Last update timestamp
  dueDate?: number;        // Optional due date
  priority: 'low' | 'medium' | 'high';  // Priority level
}
```

### AppState Interface
```typescript
interface AppState {
  tasks: Task[];          // All tasks
  lastSync: number;       // Last storage sync timestamp
}
```

## Navigation Flow

```
HomeScreen (Stack Root)
    ├── AddTaskScreen (Modal)
    └── TaskDetailScreen (Push)
```

- **Navigation Library**: React Navigation v6 (Stack Navigator)
- **Screen Transitions**: Default stack animations
- **Back Behavior**: Standard back button/gesture support

## Data Flow

1. **Creating a Task**:
   ```
   User Input → AddTaskScreen → TaskManager.createTask() 
   → StorageService.addTask() → AsyncStorage → Navigation back to HomeScreen
   ```

2. **Viewing Tasks**:
   ```
   HomeScreen mount → TaskManager.getAllTasks() 
   → StorageService.loadTasks() → AsyncStorage → Render task list
   ```

3. **Updating a Task**:
   ```
   User Edit → TaskDetailScreen → TaskManager.updateTask() 
   → StorageService.updateTask() → AsyncStorage → Navigation back
   ```

## Storage Strategy

### AsyncStorage Structure
- **Key**: `@jiffy_app_state`
- **Value**: JSON-serialized AppState object
- **Persistence**: Automatic on every data change
- **Error Handling**: Console logging with graceful degradation

### Data Persistence Guarantees
- All CRUD operations are atomic
- Data is persisted immediately after changes
- No in-memory cache conflicts
- Recovery from JSON parse errors (returns empty array)

## Styling Approach

### Design System
- **Color Palette**:
  - Primary: `#6366f1` (Indigo)
  - Success: `#10b981` (Green)
  - Warning: `#f59e0b` (Orange)
  - Error: `#ef4444` (Red)
- **Typography**: System default fonts
- **Spacing**: 4px base unit (4, 8, 12, 16, 20, 24px)
- **Border Radius**: 8-12px for cards, 28px for circular buttons

### Component Styling
- StyleSheet.create() for all styles
- No inline styles (except dynamic colors)
- Consistent elevation/shadow for cards
- Responsive layouts with Flexbox

## Future Enhancements

### Planned Features
1. **Cloud Sync**:
   - Add backend API integration
   - Implement sync conflict resolution
   - Offline queue for pending changes

2. **Advanced Task Management**:
   - Task categories/tags
   - Due date reminders
   - Recurring tasks
   - Subtasks/checklists

3. **User Experience**:
   - Dark mode support
   - Search and filter improvements
   - Task sorting options
   - Export/import functionality

4. **Collaboration**:
   - Share tasks with others
   - Team workspaces
   - Comments and attachments

### Extensibility Points
- StorageService can be extended to support multiple storage backends
- TaskManager can accommodate additional task properties without breaking changes
- Navigation structure supports adding more screens
- Type system ensures compile-time safety for changes

## Development Guidelines

### Adding New Features
1. Define types in `src/types/index.ts`
2. Implement business logic in services
3. Create or update UI components
4. Add navigation routes if needed
5. Update documentation

### Code Style
- Use TypeScript strict mode
- Follow React hooks best practices
- Implement error boundaries for production
- Use async/await for asynchronous operations
- Keep components focused and reusable

### Performance Considerations
- Use React.memo() for expensive components
- Implement FlatList for large lists
- Lazy load screens with React Navigation
- Minimize re-renders with useCallback/useMemo
- Profile performance with React DevTools

## Security Considerations

1. **Data Privacy**: All data stored locally on device
2. **Input Validation**: Validate user input before storage
3. **XSS Protection**: React Native's built-in text sanitization
4. **Dependency Management**: Regular security audits via npm audit

## Testing Strategy

### Unit Testing (Future)
- Test StorageService methods
- Test TaskManager business logic
- Test utility functions

### Integration Testing (Future)
- Test complete user flows
- Test navigation transitions
- Test data persistence

### E2E Testing (Future)
- Test critical user journeys
- Test offline functionality
- Test error scenarios

## Build and Deployment

### Development Build
```bash
npm start
```

### Production Build (Future)
- iOS: Use EAS Build or Xcode
- Android: Use EAS Build or Android Studio
- Web: Use expo export for static hosting

### Environment Configuration
- Development: Default Expo configuration
- Production: Configure app.json for store submission

## Troubleshooting

### Common Issues
1. **AsyncStorage not working**: Check app permissions
2. **Navigation issues**: Ensure proper type definitions
3. **Build errors**: Clear cache with `expo start -c`

### Debug Tools
- React Native Debugger
- Expo Dev Tools
- Chrome DevTools (for web)
- Flipper (for native debugging)

## Contributing

When contributing to this project:
1. Follow the existing code structure
2. Maintain TypeScript type safety
3. Test on both iOS and Android
4. Update documentation for significant changes
5. Follow the established design patterns
