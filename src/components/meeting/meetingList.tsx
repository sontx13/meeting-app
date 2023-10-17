/* eslint-disable no-nested-ternary */
import EmptyDataContainer from "@components/common/EmptyDataContainer";
import MeetingItemSkeleton from "@components/skeleton/MeetingItemSkeleton";
import { Meeting } from "@dts";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import MeetingItem from "./MeetingItem";

export interface MeetingListProps {
    data: Meeting[];
    loading?: boolean;
}

const Wrapper = styled.div`
    ${tw`bg-ui_bg`};
`;

const EmptyWrapper = styled.div`
    ${tw`h-[94vh]`}
`;

const MeetingList = React.forwardRef<
    HTMLDivElement,
    MeetingListProps
>((props, ref) => {
    const { data, loading = true } = props;

    return (
        <Wrapper id="meetings" ref={ref}>
            {data.map(item => (
                <MeetingItem
                    data={item}
                    key={`meeting-${item.id}`}
                />
            ))}
            {loading ? (
                [...Array(5)].map((item, index) => (
                    <MeetingItemSkeleton
                        key={`meeting-skeleton-${index}`}
                    />
                ))
            ) : data.length === 0 ? (
                <EmptyWrapper>
                    <EmptyDataContainer />
                </EmptyWrapper>
            ) : (
                ""
            )}
        </Wrapper>
    );
});

export default MeetingList;
