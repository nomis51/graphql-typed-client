import { GraphQLInterfaceType, GraphQLObjectType, GraphQLInputObjectType } from 'graphql'
import { RenderContext } from '../common/RenderContext'
import { FieldMap, Type } from './renderTypeMap'
export declare const objectType: (
  type: GraphQLObjectType | GraphQLInterfaceType | GraphQLInputObjectType,
  ctx: RenderContext,
) => Type & {
  fields: FieldMap
}
