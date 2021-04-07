"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherResolver = void 0;
const Teacher_1 = require("../entity/Teacher");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
// import {Course} from "../entity/Course";
// import {Tag} from "../entity/Tag";
let TeacherResolver = class TeacherResolver {
    constructor() {
        this.manager = typeorm_1.getManager();
        /*
            @Query(() => [Teacher])
            public async getTeachersBySpeciality(@Arg('speciality') speciality: string) {
                return this.manager.find(Teacher, {
                    where: {
                        specialities: {$in: speciality},
                    }
                })
            }
        */
        // @Query(() => [Teacher])
        // public async getTeachersByPromotionId(
        //     @Ctx() { Promotion }: Context) {
        //     return this.manager.find(Teacher, {promotionId: Promotion._id})
        // }
        /*
            @Mutation(() => Boolean)
            public async createTeacher(
                @Arg('firstName') firstName: string,
                @Arg('lastName') lastName: string,
                //@Arg('speciality') speciality: Tag[],
                @Arg('seniority') seniority: number,
                @Arg('classroom') classroom: string,
                @Ctx() { Tag }: Context,
            ) {
        
                const teacher = new Teacher(firstName, lastName, [Tag], seniority, classroom)
                return await this.manager.save(teacher)
            }
        */
    }
    async getTeachers() {
        return this.manager.find(Teacher_1.Teacher, {});
    }
};
__decorate([
    type_graphql_1.Query(() => [Teacher_1.Teacher]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "getTeachers", null);
TeacherResolver = __decorate([
    type_graphql_1.Resolver(() => Teacher_1.Teacher)
], TeacherResolver);
exports.TeacherResolver = TeacherResolver;
