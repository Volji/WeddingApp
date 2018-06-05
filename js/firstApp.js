var firstApp = angular.module('firstApp', ["firebase"]);

firstApp.controller('firstCtrl', function ($scope, $firebaseArray) {
	var ref = new Firebase("https://test1-26bd6.firebaseio.com/reservation");

	$scope.reservation = $firebaseArray(ref);

  $scope.title = 'Hello Guillaume!';
	$scope.oldReserv = {};
	//Variables Filtres
	$scope.myOrderBy = '-tps';
	$scope.searchName = '';
	//Variables totaux
	$scope.totalA = '0';
	$scope.totalE = '0';
	$scope.totaux = '0';
	$scope.erreur = false;

	//Brunch
	$scope.options = [{ name: "Oui", id: "oui" }, { name: "Non", id: "oui" }];
	$scope.selectedOption = $scope.options[0];
	//nombreuses
	$scope.optionNumber = [{ value: "0", label: "0" }, { value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" },
	{ value: "5", label: "5" }, { value: "6", label: "6" }, { value: "7", label: "7" }, { value: "8", label: "8" }, { value: "9", label: "9" }, { value: "10", label: "10" }];
	$scope.selectedOptionNumberA = $scope.optionNumber[1];
	$scope.selectedOptionNumberE = $scope.optionNumber[0];

	//FONTIONS
	$scope.orderByMe = function(x) {
		if (x === 'tps') {
			if ($scope.myOrderBy === 'tps') x = '-tps'; else x = 'tps';
		}
		if (x === 'nom') {
			if ($scope.myOrderBy === 'nom') x = '-nom'; else x = 'nom';
		}
    $scope.myOrderBy = x;
  };

	$scope.getTotal = function(){
		var total = 0;
		var total1 = 0;
		var total2 = 0;

		for(var i = 0; i < $scope.reservation.length; i++){
			var t1 = parseInt($scope.reservation[i].adulte);
			var t2 = parseInt($scope.reservation[i].enfant);
			total1 += t1;
			total2 += t2;
			total += t1 + t2;
		}
		$scope.totalA = total1 + "";
		$scope.totalE = total2 + "";
		$scope.totaux = total + '';

		return total;

	};

	$scope.trouveDoublon = function(){
		$scope.erreur = false;
		var email = $scope.inputEmail.trim();
		for(var i = 0; i < $scope.reservation.length; i++){
			if (email === $scope.reservation[i].email) {
				$scope.erreur = true;
			}
		}
	};

	//ADD
	$scope.addReservation = function(newReservation){
		var m = new Date();
		$scope.newReservation.date = m.getDate() + "-" + m.getMonth() + "-" + m.getFullYear();;
		$scope.newReservation.tps = m.getTime();
		$scope.newReservation.brunch = $scope.selectedOption.name;
		$scope.newReservation.adulte = $scope.selectedOptionNumberA.value;
		$scope.newReservation.enfant = $scope.selectedOptionNumberE.value;
		$scope.reservation.$add(newReservation);
		$scope.newReservation.nom = "";
		$scope.newReservation.email = "";
		$scope.newReservation.adulte = "";
		$scope.newReservation.enfant = "";
		$scope.newReservation.commentaire = "";
		$("#rsvp").hide();
		$("#sendYou").show();
	};
	//EDIT
	$scope.editReservation = function(reserv){
		//mode edition
		$scope.editMode = true;
		//conserve les anciennes données
		//$scope.oldReserv = Object.assign({}, reserv)﻿;
		angular.copy(reserv, $scope.oldReserv);
	};
	//MAJ
	$scope.updateReservation = function(reserv){
		var ok = false;
		if (parseInt(reserv.enfant)>=0 && parseInt(reserv.adulte)>=0) ok = true;
		if (ok) ref.child(reserv.$id).update({adulte: reserv.adulte, enfant: reserv.enfant});
		$scope.cancelEdit();
	};
	//Annuler
	$scope.cancelEdit = function(id){
		$scope.editMode = false;
		$scope.oldReserv = {};
	};
	//Supprimer
	$scope.supprimer = function(id){
		ref.child(id).remove();
	};
});

firstApp.filter("UserFilter", function(){
    return function(reservation, nom){
        var addUser;
        var selectedUsers = [];
        for(i=0; i < reservation.length; i++){

            addUser = false;
						var var1 = reservation[i].nom.toUpperCase();
						var var2 = nom.toUpperCase();
                //if(reservation[i].nom == nom){
						if (var1.startsWith(var2)) {
                    addUser = true;
            }

            if (addUser){
                selectedUsers.push(reservation[i]);
            }
        }
        return selectedUsers;
    };
});
