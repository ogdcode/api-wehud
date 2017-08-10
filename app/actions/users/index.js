'use strict'

let actions = app => {
    let paths = {
        create: require('./create')(app),
        read: require('./read')(app),
        update: require('./update')(app),
        delete: require('./delete')(app),
        
        list: require('./list')(app),
        
        posts: require('./posts')(app),
        games: require('./games')(app),
        plannings: require('./plannings')(app),
        pages: require('./pages')(app),
        
        followed: require('./followed')(app),
        followedPosts: require('./followedPosts')(app),
        followedPlannings: require('./followedPlannings')(app),
        followersPosts: require('./followersPosts')(app),
        followersPlannings: require('./followersPlannings')(app),
        
        readByToken: require('./readByToken')(app),
        updateByToken: require('./updateByToken')(app),
        deleteByToken: require('./deleteByToken')(app),
        
        postsByToken: require('./postsByToken')(app),
        gamesByToken: require('./gamesByToken')(app),
        planningsByToken: require('./planningsByToken')(app),
        pagesByToken: require('./pagesByToken')(app),
        
        followedByToken: require('./followedByToken')(app),
        followedPostsByToken: require('./followedPostsByToken')(app),
        followedPlanningsByToken: require('./followedPlanningsByToken')(app),
        followersPostsByToken: require('./followersPostsByToken')(app),
        followersPlanningsByToken: require('./followersPlanningsByToken')(app),
        
        follow: require('./follow')(app),
        followGame: require('./followGame')(app),
        unfollow: require('./unfollow')(app),
        unfollowGame: require('./unfollowGame')(app),
    };
    
    return paths
};

module.exports = actions