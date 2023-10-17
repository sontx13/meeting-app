import MeetingList from "@components/meeting/MeetingList";
import PageLayout from "@components/layout/PageLayout";
import { TOTAL_MEETING_PER_PAGE } from "@constants/common";
import { useStore } from "@store";
import React, { useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import "styled-components/macro";

const MeetingPage: React.FC = () => {
    const listRef = useRef<HTMLDivElement>(null);

    const { id: orgId } = useStore(state => state.organization) || {
        id: "",
    };

    const [meetings, getMeetings, loading] = useStore(
        state => [
            state.meetings,
            state.getMeetings,
            state.gettingMeeting,
        ],
    );

    const {
        meetings: data = [],
        total = 0,
        page = 0,
    } = meetings || {};

    let hasMore = false;
    if (data.length < total) {
        hasMore = true;
    }

    useEffect(() => {
        if (orgId && !meetings) {
            getMeetings({
                organizationId: orgId,
                page: 0,
                limit: TOTAL_MEETING_PER_PAGE,
            });
        }
    }, [orgId]);

    const handleLoadMore = () => {
        if (!orgId) {
            return;
        }
        getMeetings({
            organizationId: orgId,
            page: page + 1,
            limit: TOTAL_MEETING_PER_PAGE,
        });
    };

    return (
        <PageLayout
            tw="bg-white"
            title="Danh sách cuộc họp"
            id="meetings"
        >
            <InfiniteScroll
                dataLength={data.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={null}
                scrollableTarget="meetings"
            >
                <MeetingList
                    data={data}
                    ref={listRef}
                    loading={loading}
                />
            </InfiniteScroll>
        </PageLayout>
    );
};

export default MeetingPage;
