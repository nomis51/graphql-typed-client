import { GraphQLEnumType, GraphQLScalarType } from 'graphql'
import { RenderContext } from '../common/RenderContext'
import { Type } from './renderTypeMap'
export declare const scalarType: (type: GraphQLScalarType | GraphQLEnumType, _: RenderContext) => Type
