//build graph
MATCH (source:User)-[r:INTEREST]->(target:Tag)
WITH gds.graph.project('network', source, target) AS g
RETURN
  g.graphName AS graph, g.nodeCount AS nodes, g.relationshipCount AS rels

//Build a user graph using random walk from the previoues graph
MATCH (start:User {name: 'teste'})
CALL gds.graph.sample.rwr('TesteGraph', 'network', { samplingRatio: 0.66, startNodes: [id(start)] })
YIELD nodeCount, relationshipCount
RETURN nodeCount, relationshipCount

//Build complete graph
CALL gds.graph.project(
  'socialGraph',
  {
    User: {},
    Tag:{},
    Post: {}
  },
  ['INTEREST', 'HAS']
)


//Drop graph
CALL gds.graph.drop('network')
YIELD graphName

//Personalised PageRank
MATCH (user:User  {name: 'teste'})
CALL gds.pageRank.stream('network', {
  maxIterations: 20,
  dampingFactor: 0.85,
  sourceNodes: [user]
})
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).id AS id, score
ORDER BY score DESC, id ASC


//recomandation withou page rank
            MATCH (user:User {id: '${userId}'})-[:INTEREST]->(userTag:Tag)
            OPTIONAL MATCH (user)-[:FOLLOW]->(community:Community)-[:TAGGED]->(communityTag:Tag)
            MATCH (post:Post)-[:TAGGED]->(postTag:Tag)
            WHERE (user)-[:LIKED]->(post) OR (userTag)<-[:TAGGED]-(post) OR (communityTag)<-[:TAGGED]-(post)
            WITH user, post, COUNT(DISTINCT postTag) AS commonTags
            ORDER BY commonTags


//Personalised PageRank user by post filter
MATCH (user:User  {name: 'teste'})
CALL gds.pageRank.stream('socialGraph', {
  maxIterations: 20,
  dampingFactor: 0.85,
  sourceNodes: [user]
})
YIELD nodeId, score
WITH gds.util.asNode(nodeId) as node, nodeId, score
WHERE labels(gds.util.asNode(nodeId))[0] = 'Post'
MATCH (node)<-[:HAS]-(user:User)
WITH user{.*, label: labels(node)[0] } as user, gds.util.asNode(nodeId) as node, score, labels(gds.util.asNode(nodeId))[0] as label
RETURN node{.*, label: label ,user: user}
ORDER BY score DESC
