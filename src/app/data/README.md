# CiviAgora Data Architecture

This directory contains the complete data architecture for the CiviAgora participatory democracy platform.

## 📁 File Structure

```
/src/app/
├── types/
│   └── index.ts          # All TypeScript DTOs (Data Transfer Objects)
├── data/
│   ├── api-mock.ts       # Realistic mock data matching DTOs
│   ├── themes.ts         # Theme configuration
│   └── README.md         # This file
└── services/
    └── api.ts            # API service layer with all endpoints
```

## 🎯 Architecture Overview

### 1. TypeScript DTOs (`/types/index.ts`)

Contains **all** TypeScript interfaces that represent API responses from the backend. These DTOs are organized by domain:

- **Common Types**: `ApiResponse`, `PaginationMeta`, `LocalizedString`
- **User & Auth**: `UserDTO`, `AuthResponseDTO`, `LoginRequestDTO`
- **Themes**: `ThemeDTO`, `ThemeStatsDTO`
- **Consultations**: `ConsultationDTO`, `ConsultationCommentDTO`
- **Petitions**: `PetitionDTO`, `PetitionSignatureDTO`
- **Votes**: `VoteDTO`, `VoteOptionDTO`, `VoteResultsDTO`
- **Assemblies**: `AssemblyDTO`, `AssemblyMeetingDTO`
- **Conferences**: `ConferenceDTO`, `SpeakerDTO`, `SessionDTO`
- **Notifications**: `NotificationDTO`
- **Activities**: `ActivityDTO`, `ParticipationHistoryDTO`
- **Statistics**: `DashboardStatsDTO`, `AnalyticsDTO`
- **Search**: `SearchRequestDTO`, `SearchResponseDTO`

### 2. Mock Data (`/data/api-mock.ts`)

Contains **production-ready mock data** that exactly matches the DTOs. All data includes:

- ✅ Realistic French/German/English multilingual content
- ✅ Complete nested structures (authors, organizers, documents)
- ✅ Proper dates and timestamps
- ✅ Consistent relationships between entities
- ✅ Representative statistics and metrics

### 3. API Service Layer (`/services/api.ts`)

Provides a clean interface to access data with functions structured like real API calls:

```typescript
// All endpoints return ApiResponse<T>
const response = await apiService.consultation.getConsultations({ status: 'open' });
const consultations = response.data;
```

## 🚀 Usage in Components

### Basic Import

```typescript
import { apiService } from '@/services/api';
import type { ConsultationDTO } from '@/types';
```

### Fetching Data

```typescript
// Get all consultations
const { data: consultations } = await apiService.consultation.getConsultations();

// Get filtered consultations
const { data: openConsultations } = await apiService.consultation.getConsultations({
  status: 'open',
  themeId: 'env'
});

// Get single consultation
const { data: consultation } = await apiService.consultation.getConsultation('con_001');
```

### Using with React State

```typescript
import { useEffect, useState } from 'react';
import { apiService } from '@/services/api';
import type { ConsultationDTO } from '@/types';

function MyComponent() {
  const [consultations, setConsultations] = useState<ConsultationDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiService.consultation.getConsultations();
        setConsultations(data);
      } catch (error) {
        console.error('Error fetching consultations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render your component...
}
```

### Using with React Query (Recommended)

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['consultations'],
    queryFn: () => apiService.consultation.getConsultations(),
  });

  const consultations = data?.data || [];

  // Render your component...
}
```

## 🔧 Available API Endpoints

### Authentication
- `apiService.auth.login(credentials)` - Login user
- `apiService.auth.register(userData)` - Register new user
- `apiService.auth.forgotPassword(email)` - Request password reset
- `apiService.auth.logout()` - Logout user

### User
- `apiService.user.getCurrentUser()` - Get current user profile
- `apiService.user.updateProfile(data)` - Update user profile
- `apiService.user.getParticipationHistory()` - Get participation history
- `apiService.user.getNotifications()` - Get notifications
- `apiService.user.markNotificationAsRead(id)` - Mark notification as read
- `apiService.user.getActivities()` - Get user activities

### Themes
- `apiService.theme.getThemes()` - Get all themes
- `apiService.theme.getThemeById(id)` - Get theme by ID

### Consultations
- `apiService.consultation.getConsultations(filters?)` - Get consultations
- `apiService.consultation.getConsultation(id)` - Get single consultation
- `apiService.consultation.registerForConsultation(id)` - Register

### Petitions
- `apiService.petition.getPetitions(filters?)` - Get petitions
- `apiService.petition.getPetition(id)` - Get single petition
- `apiService.petition.signPetition(id, data)` - Sign petition

### Votes
- `apiService.vote.getVotes(filters?)` - Get votes
- `apiService.vote.getVote(id)` - Get single vote
- `apiService.vote.castVote(id, optionIds)` - Cast vote

### Assemblies
- `apiService.assembly.getAssemblies(filters?)` - Get assemblies
- `apiService.assembly.getAssembly(id)` - Get single assembly

### Conferences
- `apiService.conference.getConferences(filters?)` - Get conferences
- `apiService.conference.getConference(id)` - Get single conference
- `apiService.conference.getSpeaker(id)` - Get speaker details
- `apiService.conference.registerForConference(id, data)` - Register

### Dashboard
- `apiService.dashboard.getDashboardStats()` - Get dashboard statistics

### Search
- `apiService.search.search(params)` - Search all content

## 🎨 Multilingual Support

All DTOs use `LocalizedString` type for i18n:

```typescript
interface LocalizedString {
  fr: string;
  de: string;
  en: string;
}

// Usage
const title: LocalizedString = {
  fr: 'Réaménagement du Parc Central',
  de: 'Umgestaltung des Zentralparks',
  en: 'Central Park Redevelopment'
};

// In component
const displayTitle = consultation.title[language]; // 'fr' | 'de' | 'en'
```

## 🔄 Migration to Real Backend

When connecting to a real backend API:

1. **Keep all DTOs unchanged** - They define your data contract
2. **Replace mock data** in `/services/api.ts` with real HTTP calls
3. **Use axios, fetch, or your preferred HTTP client**:

```typescript
// Before (mock)
async getConsultations(): Promise<ApiResponse<ConsultationDTO[]>> {
  await simulateDelay();
  return {
    data: mockConsultations,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

// After (real API)
async getConsultations(): Promise<ApiResponse<ConsultationDTO[]>> {
  const response = await axios.get<ApiResponse<ConsultationDTO[]>>(
    '/api/consultations'
  );
  return response.data;
}
```

## 📊 Data Relationships

### Theme → Processes
```
ThemeDTO
  └── stats: ThemeStatsDTO
      ├── consultations: number
      ├── petitions: number
      ├── votes: number
      └── assemblies: number
```

### Consultation Structure
```
ConsultationDTO
  ├── themeId: string → ThemeDTO
  ├── author: UserSummaryDTO
  ├── organizer: OrganizerDTO
  ├── documents: DocumentDTO[]
  ├── phases: ConsultationPhaseDTO[]
  └── stats: ConsultationStatsDTO
```

### Petition Structure
```
PetitionDTO
  ├── themeId: string → ThemeDTO
  ├── author: UserSummaryDTO
  ├── recipient: RecipientDTO
  ├── milestones: PetitionMilestoneDTO[]
  └── updates: PetitionUpdateDTO[]
```

### Vote Structure
```
VoteDTO
  ├── themeId: string → ThemeDTO
  ├── options: VoteOptionDTO[]
  ├── organizer: OrganizerDTO
  └── stats: VoteStatsDTO
```

## 🧪 Testing

All mock data is designed for comprehensive testing:

- **Edge cases**: Various statuses, dates (past, present, future)
- **Multilingual**: All content in FR/DE/EN
- **Realistic numbers**: Participation rates, signatures, votes
- **Complex structures**: Nested objects, arrays, relationships

## 📝 Best Practices

1. **Always use DTOs** - Import types from `/types/index.ts`
2. **Use the API service** - Don't import mock data directly in components
3. **Handle loading/error states** - All API calls are async
4. **Type safety** - Leverage TypeScript for auto-completion
5. **Consistent naming** - Follow the `<Domain>DTO` convention

## 🤝 Backend Team Guidelines

Backend developers can use these DTOs to:

1. **Define API contracts** - Match response structures exactly
2. **Generate OpenAPI/Swagger** - Use DTOs as schema
3. **Validate responses** - Ensure type compatibility
4. **Build endpoints** - Follow the service structure

### Example NestJS Controller

```typescript
@Controller('consultations')
export class ConsultationsController {
  @Get()
  async findAll(
    @Query() filters: ConsultationFiltersDto
  ): Promise<ApiResponse<ConsultationDTO[]>> {
    const consultations = await this.consultationsService.findAll(filters);
    
    return {
      data: consultations,
      meta: {
        currentPage: 1,
        totalPages: 5,
        totalItems: 100,
        itemsPerPage: 20,
        hasNextPage: true,
        hasPreviousPage: false,
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  }
}
```

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/docs/intro)

---

**Last Updated**: January 9, 2026  
**Version**: 1.0.0  
**Maintainer**: CiviAgora Development Team
