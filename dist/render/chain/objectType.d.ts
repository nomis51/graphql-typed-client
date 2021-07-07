import { GraphQLInterfaceType, GraphQLNamedType, GraphQLObjectType } from 'graphql'
import { RenderContext } from '../common/RenderContext'
export declare const chainTypeName: (type: GraphQLNamedType, wrapper: 'Promise' | 'Observable') => string
export declare const objectType: (
  type: GraphQLObjectType | GraphQLInterfaceType,
  ctx: RenderContext,
  wrapper: 'Promise' | 'Observable',
) => void
