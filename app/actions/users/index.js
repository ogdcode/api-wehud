'use strict'

let actions = app => {
    let paths = {
        create: require('./create')(app),
        read: require('./read')(app),
        update: require('./update')(app),
        delete: require('./delete')(app),
        
        getFollowed: require('./followed')(app),
        getFollowedGames: require('./followedGames')(app),
        getFollowedPosts: require('./followedPosts')(app),
        getFollowedPlannings: require('./followedPlannings')(app),
        getFollowersPosts: require('./followersPosts')(app),
        getFollowersPlannings: require('./followersPlannings')(app),
        
        readByToken: require('./readByToken')(app),
        updateByToken: require('./updateByToken')(app),
        deleteByToken: require('./deleteByToken')(app),
        postsByToken: require('./postsByToken')(app),
        planningsByToken: require('./planningsByToken')(app),
        pagesByToken: require('./pagesByToken')(app),
        getFollowedByToken: require('./followedByToken')(app),
        getFollowedGamesByToken: require('./followedGamesByToken')(app),
        getFollowedPostsByToken: require('./followedPostsByToken')(app),
        getFollowedPlanningsByToken: require('./followedPlanningsByToken')(app),
        getFollowersPostsByToken: require('./followersPostsByToken')(app),
        getFollowersPlanningsByToken: require('./followersPlanningsByToken')(app),
        
        list: require('./list')(app),
        posts: require('./posts')(app),
        plannings: require('./plannings')(app),
        pages: require('./pages')(app),
        
        follow: require('./follow')(app),
        followGame: require('./followGame')(app),
        unfollow: require('./unfollow')(app),
        unfollowGame: require('./unfollowGame')(app),
    };
    
    return paths
};

module.exports = actions