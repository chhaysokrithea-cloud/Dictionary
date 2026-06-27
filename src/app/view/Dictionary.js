import { View, Text, TextInput, StyleSheet, FlatList , Image, ImageBackground } from 'react-native';
import { wordlocal } from '../../database/source';
import { WordItems } from '../../components/WordItems';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

export default function Dictionary() {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);

  // Load data safely
  useEffect(() => {
    if (wordlocal && Array.isArray(wordlocal)) {
      setWords(wordlocal);
    } else {
      console.error("wordlocal is not loaded or not an array!");
      setWords([]);
    }
  }, []);

  // Safe filtering
  const filteredWords = Array.isArray(words) 
    ? words.filter(item => 
        item && item.title && 
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleSelectWord = (word) => {
    setSelectedWord(word);
  };

  return (
    
    <View style={styles.main}>
      <ImageBackground source={{uri:'https://www.shutterstock.com/image-vector/vector-khmer-pattern-isolation-background-260nw-1653482329.jpg'}}
        style={{flex:1,width:300,height:150}} blurRadius={0.8}>
        
        
      
        {/* Header */}
          <View style={styles.header}>
          <Text style={styles.title}>ស្វែងរកពាក្យខ្មែរ</Text>
        </View>
          
        </ImageBackground>
        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="ស្វែងរកពាក្យ..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              setSelectedWord(null);
            }}
          />
        </View>

        {/* Selected body */}
        {selectedWord ? (
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>{selectedWord.title}</Text>
            <Text style={styles.detailBody}>{selectedWord.body}</Text>
          </View>
        ) : null}

        {/* List */}
        <FlatList
          data={filteredWords}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <WordItems model={item} onPress={handleSelectWord} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {search ? "No words found" : "សូមរងចាំ..."}
            </Text>
          }
        />
        
 
      
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1,
    fontFamily:"Siemreap",
    backgroundColor:"rgb(230, 230, 138)"
   },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    fontFamily:"Siemreap"
  },
  title: { fontSize: 26, fontWeight: 'bold', color: 'white' ,
    fontFamily:"Siemreap"
  },
  searchContainer: { padding: 25,marginTop:145, },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    fontFamily:"Siemreap",

    
  },
  detailCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 10, height: 5 },
    elevation: 2,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily:"Siemreap"
  },
  detailBody: {
    fontSize: 15,
    color: '#9c7a7a',
    lineHeight: 22,
    fontFamily:'Siemreap,Montserrat-Bold'
  },
  listContainer: { paddingHorizontal: 20, paddingBottom: 400 },
  emptyText: { textAlign: 'center', marginTop: 0, color: '#666', fontSize: 16 },
});