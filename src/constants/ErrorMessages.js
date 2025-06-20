
const ERROR_MESSAGES = {
    userNotFound:
        "Invalid username or password. Please check your credentials.",
    invalidUsernameOrPassword:
        "Invalid username or password. Please check your credentials.",
    autoGeneratedPasswordExpired:
        "Temporary generated password expired. Please reset your password.",

    unexpectedErrorOccurred: "Unexpected error occurred. Try again later.",
    usernameExists: "Username is already taken.",
    emailExists: "Email already taken.",
    alreadyAppliedForThisJob: "You have already applied for this job.",
    applyApiFailed: "This operation failed. Please try again later.",
    usernameTaken: "This username is already taken. Please choose a different one.",
    emailTaken: "This email is already used. Please choose a different email.",
    workExperienceNotFound: "The work experience record you’re looking for doesn’t exist.",
    unAuthorizedToViewWorkExperiences: "You are not authorized to view these work experiences.",
    unAuthorizedToViewWorkExperience: "You are not authorized to view this work experience.",
    saveWorkExperienceFailed: "We couldn’t save your work experience. Please try again later.",
    editWorkExperienceFailed: "We couldn’t update your work experience. Please try again.",
    deleteWorkExperienceFailed: "Failed to delete the work experience. Please refresh and try again.",
    educationNotFound: "The selected education record was not found.",
    unAuthorizedToViewEducations: "You are not authorized to view this user's education history.",
    unAuthorizedToViewEducation: "You are not authorized to view this education record.",
    skillNotFound: "The selected skill was not found.",
    unAuthorizedToViewSkills: "You are not authorized to view this user's skills.",
    unAuthorizedToViewSkill: "You are not authorized to view this skill.",
    unAuthorizedToViewApplicantEnglishLevel: "You are not authorized to view this English level entry.",
    applicantEnglishLevelNotFound: "The requested English level entry was not found.",
    notAuthorizedToViewTheseProjects: "You are not authorized to view these projects.",
    projectNotFound: "The requested project was not found.",
    notAuthorizedToViewThisProject: "You are not authorized to view this project.",
    startDateCannotBeInFuture: "Start date cannot be in the future.",
    endDateRequiredWhenExperienceIsFinished: "End date is required when experience is marked as finished.",
    endDateRequiredWhenProjectIsFinished: "End date is required when project is marked as finished.",
    endDateMustBeAfterStartDate: "End date must be after start date.",
    jobPostingNotFound: "The requested job posting does not exist.",
    officesShouldHaveALocation: "For hybrid or on-site positions, both city and country must be provided.",
    saveJobPostingFailed: "Unable to save the job posting right now. Please try again later.",
    editJobPostingFailed: "Unable to update the job posting right now. Please try again later.",
    deleteJobPostingFailed: "Unable to delete the job posting right now. Please try again later.",
    jobPostingClosed: "This job posting is closed. Please try again later.",
    invalidPassword: "The password provided is invalid. Please try again.",
    passwordMismatch: "Passwords do not match. Please re-enter them.",
    unauthorized: "You do not have permission to perform this action.",
    accessDenied: "Access denied. Please log in with the appropriate credentials.",
    validationError: "One or more fields are invalid. Please check your input.",
    resourceNotFound: "Requested resource could not be found.",
    operationFailed: "Operation failed. Please try again later."


};

export default ERROR_MESSAGES;