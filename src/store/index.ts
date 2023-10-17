import { create } from "zustand";
import { devtools } from "zustand/middleware";
import createAppStore, { AppSlice } from "./appSlice";
import createAuthStore, { AuthSlice } from "./authSlice";
import createFeedbackSlide, { FeedbackSlice } from "./feedbackSlice";
import createInformationGuideSlide, {
    InformationGuideSlice,
} from "./informationGuideSlice";
import createMeetingSlide, {
    MeetingSlice,
} from "./meetingSlice";
import createOrganizationSlide, {
    OrganizationSlice,
} from "./organizationSlice";
import createScheduleSlide, { ScheduleSlice } from "./scheduleSlice";
import createProfileSlice, { ProfileSlice } from "./profileSlice";

type State = AppSlice &
    AuthSlice &
    FeedbackSlice &
    InformationGuideSlice &
    MeetingSlice &
    OrganizationSlice &
    ScheduleSlice &
    ProfileSlice;

export const useStore = create<State>()(
    devtools((...a) => ({
        ...createAppStore(...a),
        ...createAuthStore(...a),
        ...createFeedbackSlide(...a),
        ...createInformationGuideSlide(...a),
        ...createMeetingSlide(...a),
        ...createOrganizationSlide(...a),
        ...createScheduleSlide(...a),
        ...createProfileSlice(...a),
    })),
);
