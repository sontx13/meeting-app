import { Meetings } from "@dts";
import {
    getMeetings,
    GetMeetingsParams,
} from "@service/services.mock";
import { StateCreator } from "zustand";

export interface MeetingSlice {
    gettingMeeting?: boolean;
    meetings?: Meetings;
    getMeetings: (params: GetMeetingsParams) => Promise<void>;
}

const MeetingSlice: StateCreator<MeetingSlice> = set => ({
    gettingMeeting: true,

    getMeetings: async (params: GetMeetingsParams) => {
        try {
            set(state => ({
                ...state,
                gettingMeeting: true,
            }));
            const meetings = await getMeetings(params);
            set(state => ({
                ...state,

                gettingMeeting: false,

                meetings: {
                    ...meetings,
                    meetings: [
                        ...(state.meetings?.meetings || []),
                        ...meetings.meetings,
                    ],
                    currentPageSize: meetings.currentPageSize,
                    page: meetings.page,
                },
            }));
        } catch (err) {
            set(state => ({
                ...state,
                gettingMeeting: false,
            }));
        }
    },
});

export default MeetingSlice;
