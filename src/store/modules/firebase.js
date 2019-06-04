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
                val.limit && ref.limit(val.limit);
                let query = ref;
                val.filters && query.where(`${val.filters.field}`, `${val.filters.cond}`, val.filters.eq);
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

                let ref = firebase.firestore().collection(`${collection}`).doc(reference);

                ref.update({
                    history: firebase.firestore.FieldValue.arrayUnion(value.val),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
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