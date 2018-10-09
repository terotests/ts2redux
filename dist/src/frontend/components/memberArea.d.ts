/**
* @redux model
*/
export interface CustomUIState {
    membersList: MemberEntity[];
}
export interface MemberEntity {
    name: string;
}
export interface Props {
    /**
     * @from MembersModel.membersList
     */
    members: Array<MemberEntity>;
    /**
     * @to MembersModel.loadMembers
     */
    loadMembers: () => any;
}
export declare const MemberAreaComponent: (props: Props) => any;
