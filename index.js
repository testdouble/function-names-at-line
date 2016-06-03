var acorn = require('acorn')
var walk = require('acorn/dist/walk')

module.exports = function (source, lineNumber) {
  var ast = acorn.parse(source, {locations: true})
  return functionNamesAtLineNumber(ast, lineNumber)
}

/*
 * Because acorn/dist/walk uses function callbacks it looks async, but apparently
 * isn't, so this method just wraps `walk`'s lack of a return value.
 */
function functionNamesAtLineNumber (ast, lineNumber) {
  var names = []

  walk.ancestor(ast, {
    'FunctionDeclaration': function (node, ancestors) {
      if (isNodeBetweenLines(node, lineNumber)) {
        names.push(nameFor(node.id))
      }
    },
    'FunctionExpression': function (node, ancestors) {
      if (isNodeBetweenLines(node, lineNumber)) {
        if (node.id) names.push(nameFor(node.id))

        var parentNode = ancestors[ancestors.length - 2]
        if (parentNode.type === 'Property') {
          names.push(nameFor(parentNode.key))
        } else if (parentNode.type === 'AssignmentExpression') {
          if (parentNode.left.type === 'MemberExpression') {
            names.push(nameFor(parentNode.left.property))
          } else if(parentNode.left.type === 'Identifier') {
            names.push(nameFor(parentNode.left))
          }
        } else if (parentNode.type === 'VariableDeclarator') {
          names.push(nameFor(parentNode.id))
        }
      }
    }
  })

  return names
}

function isNodeBetweenLines (node, lineNumber) {
  return lineNumber >= node.loc.start.line &&
         lineNumber <= node.loc.end.line
}

function nameFor (node) {
  if (node.type === 'Literal') {
    return node.value
  } else if (node.type === 'Identifier') {
    return node.name
  }
}
