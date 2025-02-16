import type { Processor } from 'unified';
import type { Literal, Node, Parent } from 'unist';

export interface Options {
  [nodeType: string]: (value: unknown, node: Node) => string;
}

interface TraversalItem {
  node: Node;
  parentItem?: TraversalItem;
  traversed: boolean;
  result: string;
}

function isLiteralNode(node: Node): node is Literal {
  return 'value' in node;
}

function isParentNode(node: Node): node is Parent {
  return 'children' in node;
}

export function unistToString(tree: Node, handlers: Options): string {
  const traversalStack: TraversalItem[] = [];
  traversalStack.push({ node: tree, traversed: false, result: '' });

  while (traversalStack.length > 0) {
    const item = traversalStack[traversalStack.length - 1];
    const node = item.node;

    if (isLiteralNode(node)) {
      if (item.parentItem) {
        item.parentItem.result += handlers[node.type](node.value, node);
      } else {
        return handlers[node.type](node.value, node);
      }
      traversalStack.pop();
    } else if (isParentNode(node)) {
      if (item.traversed) {
        if (item.parentItem) {
          item.parentItem.result += handlers[node.type](item.result, node);
        } else {
          return handlers[node.type](item.result, node);
        }
        traversalStack.pop();
      } else {
        for (let i = node.children.length - 1; i >= 0; i--) {
          const childNode = node.children[i];
          traversalStack.push({
            node: childNode,
            parentItem: item,
            traversed: false,
            result: '',
          });
        }
      }
    }

    item.traversed = true;
  }

  return '';
}

export function unistStringify(this: Processor, options: Options) {
  this.compiler = (tree) => unistToString(tree, options);
}
