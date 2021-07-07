import { GraphQLArgument, GraphQLEnumValue, GraphQLField, GraphQLInputField, GraphQLNamedType } from 'graphql'
import Maybe from 'graphql/tsutils/Maybe'
export declare const comment: (comment: { text?: Maybe<string>; deprecated?: Maybe<string> }) => string
export declare const typeComment: (type: GraphQLNamedType) => string
export declare const fieldComment: (field: GraphQLEnumValue | GraphQLField<any, any, any>) => string
export declare const argumentComment: (arg: GraphQLArgument | GraphQLInputField) => string
