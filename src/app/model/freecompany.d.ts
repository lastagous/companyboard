import { Character } from "@xivapi/angular-client";

export interface FreeCompanyModel {
	FreeCompany: any,
	FreeCompanyMembers: Array<FreeCompanyMemberModel>
}

export interface FreeCompanyMemberModel {
	Avatar: string,
	FeastMatches: number,
	ID: number,
	Lang: any
	Name: string,
	Rank: string,
	RankIcon: string,
	Server: string
	Character?: Character
}