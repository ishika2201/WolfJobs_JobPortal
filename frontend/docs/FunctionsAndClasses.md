# FrontEnd:

## 1. Authentication(src/actions/auth.js)

### I. Function Login

#### Parameters:(Email, Password)

#### Method: 'POST'

#### Decription: Makes an API call to create a session for the user. The function receives JSON data from the server side.

If the login is successful, the function calls "Login successful" function that updates the state of the user on client side.
"Login Failed" function is calledif there is an error or if the credentials are invalid.

#### Output:

data(token, user)

#### message:sign in successful

success:True/False

### II. Function SignUp

#### Parameters: Email, password, confirm Password, name

#### Method: "Post"

#### Description:

Create a user(Manager or Applicant). The server side checks the conditions.
a.Password & Confirm Password matches.
b.If a user already exists with the same email. If user already exists, it returns the user.
c.Creates a new user if there is not a user with the same email in DB.

The function updates the state of the user on client side on success.

### III. Function Edit User Profile

#### Parmaters:

name, password, role, address, phonenumber, hours, gender, dob, skills

#### Method: "Post"

#### Description:

Finds the user inside the database & updates its name, password, role, address, phonenumber, hours, gender, dob, skills

#### Output:

#"User is updated Successfully"
data{user}
success:True

### IV. Function createJob

#### Parameters:

jobname, id, skills, location, description, pay, schedule

#### Method: "Post"

#### Description:

Creates new Job

#### Output:

data: {
job: job,
},
message: "Job Created!!",
success: true,

### V. Function closeJob

#### Parameters:

JobId

#### Method:

'POST'

#### Description:

Function makes an API call to change the status of the job to open to close

#### Output:

message: "Job status is updated Successfully",

      data: {
        job,
      },
      success: true,

### VI. Function Create Application

#### Parameters-

ID, Name, Address, PhoneNumber, Hours, DOB, gender, Skills, JobName, JobId, MangerId

#### Method: "Post"

#### Description:

Function makes a new application whenever an applicant applies.

#### Output:

#### Message:

data: {
application: application,
},
message: "Application Created!!",
success: true,
}

### VII. Function Accept Application

#### Parameters-

ApplicationId

#### Method: "Post"

#### Description:

Changes the status of the application from pending to Accepted.

#### Output:

message: "Application is updated Successfully",
data: {
application,
},
success: true,

### VIII. Function Reject Application

#### Parameters-

ApplicationId

#### Method: "Post"

#### Description:

Changes the status of the application from pending to Rejected.

#### Output:

message: "Application is updated Successfully",
data: {
application,
},
success: true

### IX. Function Save Job

#### Parameters:
- `userId` (string): The ID of the user.
- `jobId` (string): The ID of the job to save (optional for retrieval only).

#### Method:
- `'POST'`

#### Description:
The `saveJob` function makes an API call to save a specific job to the user's saved jobs list. If `jobId` is provided, the function saves the job for the user if it hasn't already been saved. If `jobId` is omitted, it retrieves the list of all saved jobs for the user.

#### Output:
- **On Success**:
  ```json
  {
    "message": "Job saved successfully" or "List of saved jobs retrieved successfully",
    "data": [list of saved jobs],
    "success": true
  }
  ```
- **On Error**:
  - 404 for "User not found"
  - 500 for "Internal Server Error"

### X. Function Unsave Job

#### Parameters:
- `userId` (string): The ID of the user.
- `jobId` (string): The ID of the job to unsave.

#### Method:
- `'POST'`

#### Description:
The `unsaveJob` function makes an API call to remove a specific job from the user's saved jobs list.

#### Output:
- **On Success**:
  ```json
  {
    "message": "Job unsaved successfully",
    "data": [list of remaining saved jobs],
    "success": true
  }
  ```
- **On Error**:
  - 404 for "User not found"
  - 500 for "Internal Server Error"

### XI. Component JobsListView

#### Parameters:
- `jobsList` (Job[]): An array of job objects to display.
- `title` (string, optional): The title for the job list view (default: "All jobs").

#### Method:
- `'React.FC'`

#### Description:
The `JobsListView` component displays a list of jobs with filter options for job types. It allows users to filter jobs based on their employment type, specifically 'full-time' and 'part-time'. The component utilizes React hooks (`useState` and `useMemo`) to manage the filter state and efficiently compute the filtered list of jobs.

#### Output:
- **Rendered UI**: A title for the job list, filter buttons for job types, and a list of job tiles rendered using the `JobListTile` component.

#### Code Explanation:
- The component accepts a list of jobs and an optional title.
- It maintains a filter state that determines which jobs are displayed.
- The filtering logic is memoized to optimize performance.
- Filter buttons are dynamically generated based on the defined filter types.
