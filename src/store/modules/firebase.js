import firebase from 'firebase/app'



export default {
    state: {
        opponent: []
    },
    actions: {
        //collection, target, filters/field/cond/eq, limit
        getData({commit, state}, val){
            return new Promise(function(resolve, reject){
                let collection = val.collection;
                let target = val.target;
                let ref = firebase.firestore().collection(`${collection}`);
                let query = ref;
                if(val.limit) query = ref.limit(val.limit);
                if(val.filters) query = query.where(`${val.filters.field}`, `${val.filters.cond}`, val.filters.eq);
                console.log(query,'query');
                query.get().then(res=>{
                    let data = {
                        collection: null,
                        body: []
                    };
                    data.collection = res.docs[0].id;
                    res.forEach(i=> {
                        data.body.push(i.data());
                    });
                    resolve(data);
                });
            })
        },
        addData({commit, state}, val){
            return new Promise(function(resolve, reject){
                let collection = val.collection;
                let value = val.val;

                let ref = firebase.firestore().collection(`${collection}`);

                ref.add(value).then((response)=>{
                    console.log(response, 'response');
                    resolve(response)
                })
            })
        },
        setData({commit, state}, val){
            return new Promise(function(resolve, reject){
                let collection = val.collection;
                let value = val.val;
                let reference = val.ref;

                let ref = firebase.firestore().collection(`${collection}`).doc(reference);

                ref.set(value).then((response)=>{
                    console.log(response, 'response');
                    resolve(response)
                })
            })
        },
        updateArray({commit, state}, val){
            return new Promise(function(resolve, reject){
                let collection = val.collection;
                let value = val.val;
                let reference = val.ref;
                let field = val.field;
                console.log(val, 'valvalvalvalvlavla');

                let ref = firebase.firestore().collection(`${collection}`).doc(reference);
                let toUpdate = {timestamp: firebase.firestore.FieldValue.serverTimestamp()};
                toUpdate[field] = firebase.firestore.FieldValue.arrayUnion(value);
                console.log(toUpdate, 'toUpdatetoUpdatetoUpdatetoUpdate');

                ref.update(toUpdate);
                resolve(ref);
            })
        },
        changeFieldInDoc({commit, state}, val){
            return new Promise(function(resolve, reject){
                let collection = val.collection;
                let value = val.val;
                let reference = val.ref;
                console.log(val, 'valvalvalvalvlavla');
                let ref = firebase.firestore().collection(`${collection}`).doc(reference);

                ref.update(value);
                resolve(ref);
            })
        }
    },
    mutations: {
        saveGotData(state, val){
            console.log(`state[${val.target}] = ${val.val}`);
            state[`${val.target}`] = val.val;
        }
    }
}