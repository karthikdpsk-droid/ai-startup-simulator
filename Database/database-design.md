# AI Startup Simulator - Database Design

## Database Name
ai_startup_simulator

## Technology
- Database: MongoDB Atlas
- ODM: Mongoose

## Collections

### 1. users
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| _id | ObjectId | Auto | Primary Key |
| name | String | Yes | User full name |
| email | String | Yes | Unique |
| password | String | Yes | Bcrypt hashed |
| createdAt | Date | Auto | Timestamp |

### 2. projects
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| _id | ObjectId | Auto | Primary Key |
| userId | ObjectId | Yes | Ref: users |
| startupIdea | String | Yes | Idea description |
| industry | String | No | Industry type |
| targetAudience | String | No | Target users |
| createdAt | Date | Auto | Timestamp |

### 3. reports
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| _id | ObjectId | Auto | Primary Key |
| userId | ObjectId | Yes | Ref: users |
| prompt | String | Yes | User input |
| result | String | Yes | AI response JSON |
| score | String | No | AI score JSON |
| type | String | Yes | idea/techstack/roadmap |
| createdAt | Date | Auto | Timestamp |

## Relationships
User -> Many Projects
User -> Many Reports
Project -> Many Reports

## Security
- Passwords are bcrypt hashed
- Never store plain passwords
