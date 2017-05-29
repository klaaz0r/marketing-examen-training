<template>
<div class="container">
  <h1>Nieuwe vraag aanmaken</h1>
  <form>
    <div class="form-group">
      <label for="exampleTextarea">Vraag</label>
      <textarea v-model="question" class="form-control" id="exampleTextarea" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label for="exampleTextarea">Uitleg</label>
      <textarea v-model="description" class="form-control" id="exampleTextarea" rows="3"></textarea>
    </div>
    <fieldset class="form-group">
      <legend>Antwoorden</legend>
      <p>Voeg vier antwoorden in en selecteer het correcte antwoord</p>

      <div v-for="(_, index) in 4">
        <div class="input-group">
          <span class="input-group-addon">
          <input v-model="answers[index].correct" type="checkbox" aria-label="Checkbox for following text input">
        </span>
          <input v-model="answers[index].text" type="text" class="form-control" aria-label="Text input with checkbox">
        </div>
      </div>

    </fieldset>

    <div v-show="message.status !== 'HIDDEN'">
      <div v-if="message.status === 'ERROR'">
        <div class="alert alert-danger" role="alert">
          <a class="alert-link">Probleem met maken!</a>
          <p>{{message.text}}</p>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-success" role="alert">
          <a class="alert-link">Vraag is geupload!</a>
        </div>
      </div>
    </div>

    <button @click="addItem($event)" class="btn btn-primary">Toevoegen</button>
  </form>
</div>
</template>

<script>
import db from '../../database'

export default {
  name: 'create',
  data() {
    return {
      question: '',
      description: '',
      answers: [{
        text: '',
        correct: false
      }, {
        text: '',
        correct: false
      }, {
        text: '',
        correct: false
      }, {
        text: '',
        correct: false
      }],
      message: {
        text: '',
        status: 'HIDDEN'
      }
    }
  },
  firebase: {
    questions: db.ref('questions')
  },
  methods: {
    addItem(e) {
      e.preventDefault()

      // if (this.answers.filter(answer => answer.correct).length > 1) {
      //   this.message.text = 'Er kan maar een antwoord goed zijn'
      //   this.message.status = 'ERROR'
      //   return
      // }

      if (!this.question && !this.description) {
        this.message.text = 'Voer een vraag en uitleg in'
        this.message.status = 'ERROR'
        return
      }

      this.message.status = 'SUCCESS'

      this.$firebaseRefs.questions.push({
        text: this.question,
        description: this.description,
        answers: this.answers,
        status: status = {
          answered: false,
          correct: false
        }
      })

      // const hidemessage = setInterval(function() {
      //   this.message = {
      //     text: '',
      //     status: 'HIDDEN'
      //   }
      //   clearInterval(hidemessage)
      // }, 1000)

      this.question = ''
      this.description = ''
      this.answers = [{
        text: '',
        correct: false
      }, {
        text: '',
        correct: false
      }, {
        text: '',
        correct: false
      }, {
        text: '',
        correct: false
      }]
    }
  }
}
</script>

<style scoped>
.input-group {
  margin-top: 15px;
}
</style>
