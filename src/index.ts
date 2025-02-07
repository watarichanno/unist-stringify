import type { Processor } from 'unified';
import type { Node } from 'unist';

interface Options {
  [nodeType: string]: string | ((tree: Node) => string);
}

export function unistToString(tree: Node, handlers: Options): string {
  return tree.type + ' ' + handlers['o'];
}

export function unistStringify(this: Processor, options: Options) {
  this.compiler = (tree) => unistToString(tree, options);
}
